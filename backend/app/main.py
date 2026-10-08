from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import employees


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Employee Management API",
    description="Employee Management System API",
    version="1.0.0"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routes
app.include_router(
    employees.router
)


@app.get("/")
def root():
    return {
        "message": "Employee Management API is running"
    }