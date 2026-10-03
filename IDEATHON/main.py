from fastapi import FastAPI, Request

app = FastAPI()


@app.get("/")
def inicio():
    return {"mensagem": "API do chatbot funcionando!"}


@app.post("/webhook")
async def receber_mensagem(request: Request):
    dados = await request.json()

    print("Mensagem recebida:")
    print(dados)

    return {
        "status": "recebido"
    }