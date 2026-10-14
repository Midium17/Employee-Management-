from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import employees, departments
from .config import settings


app = FastAPI(
    title="Employee Management API",
    description="Employee Management System API",
    version="1.0.0",
    
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routes
app.include_router(employees.router)
app.include_router(departments.router)


@app.get("/")
def root():
    return { "message": "Employee Management API is running"}

@app.get("/health")
def health():
    return { "status": "healthy"}