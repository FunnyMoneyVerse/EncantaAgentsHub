import stripe
from fastapi import APIRouter, Request, HTTPException, Depends
from app.core.config import settings
from app.api.deps import get_db
from sqlalchemy.orm import Session
from app.models.profile import Profile
from typing import Dict, Any

# Initialize Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

router = APIRouter()

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Handle Stripe webhook events
    """
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle the event
    event_type = event["type"]
    data = event["data"]["object"]
    
    if event_type == "checkout.session.completed":
        # Handle checkout session completed
        await handle_checkout_session_completed(data, db)
    elif event_type == "customer.subscription.updated":
        # Handle subscription updated
        await handle_subscription_updated(data, db)
    elif event_type == "customer.subscription.deleted":
        # Handle subscription deleted
        await handle_subscription_deleted(data, db)
    
    return {"status": "success"}

async def handle_checkout_session_completed(session: Dict[Any, Any], db: Session):
    """
    Handle checkout.session.completed event
    """
    if "customer" in session and "subscription" in session:
        customer_id = session["customer"]
        subscription_id = session["subscription"]
        
        # Get subscription details
        subscription = stripe.Subscription.retrieve(subscription_id)
        product_id = subscription["items"]["data"][0]["price"]["product"]
        
        # Get product details
        product = stripe.Product.retrieve(product_id)
        membership = product.get("metadata", {}).get("membership", "free")
        
        # Update user profile
        update_user_subscription(db, customer_id, subscription_id, membership)

async def handle_subscription_updated(subscription: Dict[Any, Any], db: Session):
    """
    Handle customer.subscription.updated event
    """
    if "customer" in subscription and "id" in subscription:
        customer_id = subscription["customer"]
        subscription_id = subscription["id"]
        
        # Get product details
        product_id = subscription["items"]["data"][0]["price"]["product"]
        product = stripe.Product.retrieve(product_id)
        membership = product.get("metadata", {}).get("membership", "free")
        
        # Update user profile
        update_user_subscription(db, customer_id, subscription_id, membership)

async def handle_subscription_deleted(subscription: Dict[Any, Any], db: Session):
    """
    Handle customer.subscription.deleted event
    """
    if "customer" in subscription and "id" in subscription:
        customer_id = subscription["customer"]
        subscription_id = subscription["id"]
        
        # Update user profile to free tier
        update_user_subscription(db, customer_id, subscription_id, "free")

def update_user_subscription(db: Session, customer_id: str, subscription_id: str, membership: str):
    """
    Update user subscription status in database
    """
    # Find user profile by Stripe customer ID
    profile = db.query(Profile).filter(Profile.stripe_customer_id == customer_id).first()
    
    if profile:
        # Update subscription details
        profile.stripe_subscription_id = subscription_id
        profile.membership = membership
        db.commit()
        return True
    
    return False 