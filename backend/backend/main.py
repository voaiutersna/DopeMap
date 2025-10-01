# from fastapi import FastAPI, Depends
# from typing import Union
# from pydantic import BaseModel

# from sqlalchemy import create_engine, text , Column, Integer, String, Float
# from sqlalchemy.orm import sessionmaker, Session, declarative_base
# from sqlalchemy.ext.declarative import declarative_base


# # Step1 : Create a SQLAlchemy engine
# # ใช้ psycopg v3
# #กำหนดการเชื่อมต่อ
# # DATABASE_URL = "postgresql+psycopg://postgres:sosgasdf1234@localhost:5432/postgres"
# DATABASE_URL = 'postgresql://neondb_owner:npg_3heOIs0NPLum@ep-super-smoke-a1v9ddnw-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
# # database connection  
# engine = create_engine(
#     DATABASE_URL,
#     connect_args={
#         "sslmode": "require",
#         "prepared_statement_cache_size": 0,   # สำคัญกับ PgBouncer
#     },
#     pool_pre_ping=True,  # ช่วยรีเช็คคอนเนกชันก่อนใช้
# )

# #สร้าง Session = ช่องทางการคุยกับ DB (เริ่ม transaction, query, insert, commit)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# #สร้าง Base สำหรับ ORM : Base class เป็น class หลักที่ใช้เป็น instance สำหรับการสร้าง class ที่แทนตารางใน database
# Base = declarative_base() #กำหนด schema base model

# # Step2 : ORM class
# # สร้างโมเดลสำหรับฐานข้อมูล
# class Item(Base):
#     __tablename__ = "items"
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     email = Column(String, index=True)
#     password = Column(String, index=True)

# # สร้างฐานข้อมูล
# Base.metadata.create_all(bind=engine)


# app = FastAPI()

# # Step3 : Pydantic model
# # 1 - Base
# class ItemBased(BaseModel):
#     name: str
#     email: str
#     password: str


# # 2 - request
# class ItemCreated(ItemBased):
#     pass

# # 3 - response
# class ItemResponse(ItemBased):
#     id : int
#     class Config: #response tool
#         from_attributes = True

# #dependency ปิด db
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # Step4 : CRUD

# @app.post("/submit", response_model = ItemResponse)
# def submit_data(item: ItemCreated, db:Session = Depends(get_db)):
#     db_item = Item(**item.model_dump())
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item

# # check connecting database
# @app.get("/ping-db")
# def ping_db(db: Session = Depends(get_db)):
#     try:
#         db.execute(text("SELECT 1"))
#         return {"status": "ok", "message": "✅ Database connected"}
#     except Exception as e:
#         return {"status": "error", "message": str(e)}

# @app.get("/")
# def read_root():
#     return {"Hello": "World3"}

# # @app.get("/items/{item_id}")
# # def read_item(item_id: int, q: Union[str, None] = None):
# #     return {"item_id": item_id, "q": q}

# # @app.put("/items/{item_id}")
# # def update_item(item_id: int, item: Item):
# #     return {"item_id": item_id, "item_name": item.name, "item_description": item.desc}

# # @app.delete("/items/{item_id}")
# # def delete_item(item_id: int, item: Item):
# #     return {"item_id": item_id, "item_name": item.name, "item_description": item.desc}

# #fastapi dev main.py

from fastapi import FastAPI, Depends
from typing import Union
from pydantic import BaseModel
from sqlalchemy import create_engine, text, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from sqlalchemy.ext.declarative import declarative_base

# Step1 : Create a SQLAlchemy engine
DATABASE_URL = 'postgresql://neondb_owner:npg_3heOIs0NPLum@ep-super-smoke-a1v9ddnw-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'

# สร้าง engine สำหรับ NeonDB
engine = create_engine(
    DATABASE_URL,
    connect_args={
        "sslmode": "require",
    },
    pool_pre_ping=True,
    pool_size=5,  # จำกัดจำนวน connection
    max_overflow=10,
    echo=False  # เปิดเป็น True ถ้าอยากเห็น SQL queries
)

# สร้าง Session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# สร้าง Base สำหรับ ORM
Base = declarative_base()

# Step2 : ORM class
class Item(Base):
    __tablename__ = "items"  # แก้ไขตรงนี้! ต้องเป็น __tablename__
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    password = Column(String, index=True)

# สร้างตารางในฐานข้อมูล
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Step3 : Pydantic model
class ItemBased(BaseModel):
    name: str
    email: str
    password: str

class ItemCreated(ItemBased):
    pass

class ItemResponse(ItemBased):
    id: int
    
    class Config:
        from_attributes = True

# Dependency function
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Step4 : CRUD Endpoints
@app.post("/submit", response_model=ItemResponse)
def submit_data(item: ItemCreated, db: Session = Depends(get_db)):
    db_item = Item(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/items")
def get_all_items(db: Session = Depends(get_db)):
    items = db.query(Item).all()
    return {"items": items}

@app.get("/items/{item_id}")
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        return {"error": "Item not found"}
    return item

# ตรวจสอบการเชื่อมต่อ
@app.get("/ping-db")
def ping_db(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1"))
        return {"status": "ok", "message": "✅ Database connected successfully"}
    except Exception as e:
        return {"status": "error", "message": f"❌ Connection failed: {str(e)}"}

@app.get("/")
def read_root():
    return {"Hello": "World", "status": "FastAPI + NeonDB is running!"}