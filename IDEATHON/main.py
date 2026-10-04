from fastapi import FastAPI, Request, Query
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel

app = FastAPI()

VERIFY_TOKEN = "ideathon123"


class Mensagem(BaseModel):
    mensagem: str
    numero: str


@app.get("/")
def inicio():
    return {
        "mensagem": "API do chatbot funcionando!"
    }


@app.get("/webhook")
def verificar_webhook(
    hub_mode: str = Query(None, alias="hub.mode"),
    hub_verify_token: str = Query(None, alias="hub.verify_token"),
    hub_challenge: str = Query(None, alias="hub.challenge")
):
    if hub_mode == "subscribe" and hub_verify_token == VERIFY_TOKEN:
        return PlainTextResponse(hub_challenge)

    return PlainTextResponse("Token inválido", status_code=403)


@app.post("/webhook")
async def receber_mensagem(request: Request):

    dados = await request.json()

    print("Mensagem recebida:")
    print(dados)

    return {
        "status": "recebido"
    }