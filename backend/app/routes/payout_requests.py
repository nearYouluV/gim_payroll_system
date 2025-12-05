"""Payout requests API routes"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.db.session import get_db
from app.models.payout_request import PayoutRequest
from app.schemas.payout_request import (
    PayoutRequestCreate,
    PayoutRequestResponse,
    PayoutRequestUpdate,
)

router = APIRouter(prefix="/payout-requests", tags=["payouts"])


@router.post("/", response_model=PayoutRequestResponse, status_code=status.HTTP_201_CREATED)
async def create_payout_request(
    payload: PayoutRequestCreate, db: AsyncSession = Depends(get_db)
):
    """Create a new payout request"""
    payout = PayoutRequest(**payload.model_dump())
    db.add(payout)
    await db.commit()
    await db.refresh(payout)
    return payout


@router.get("/", response_model=list[PayoutRequestResponse])
async def list_payout_requests(db: AsyncSession = Depends(get_db)):
    """List all payout requests"""
    result = await db.execute(
        select(PayoutRequest)
        .options(selectinload(PayoutRequest.employee))
        .order_by(PayoutRequest.created_at.desc())
    )
    return result.scalars().all()


@router.get("/{payout_id}", response_model=PayoutRequestResponse)
async def get_payout_request(payout_id: int, db: AsyncSession = Depends(get_db)):
    """Get payout request by id"""
    result = await db.execute(
        select(PayoutRequest)
        .options(selectinload(PayoutRequest.employee))
        .where(PayoutRequest.id == payout_id)
    )
    payout = result.scalars().first()
    if not payout:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payout request not found")
    return payout


@router.put("/{payout_id}", response_model=PayoutRequestResponse)
async def update_payout_request(
    payout_id: int,
    payload: PayoutRequestUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Update payout request status/reason"""
    result = await db.execute(
        select(PayoutRequest)
        .options(selectinload(PayoutRequest.employee))
        .where(PayoutRequest.id == payout_id)
    )
    payout = result.scalars().first()
    if not payout:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payout request not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(payout, field, value)

    await db.commit()
    await db.refresh(payout)
    return payout
