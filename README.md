# Planet chat back-end

# Instalação

faça o clone
```bash
git clone git@github.com:P4ul0Silva/planet-chat-backend.git
```
cd para 
```bash
cd planet-chat-backend
```
rode ```yarn``` ou ```npm```

## Após instalado

Na raiz do projeto, crie um arquivo ".env" (sem aspas)
O arquivo desse se parecer com isso ( siga as instruçoes em .env.example)

![image](https://github.com/P4ul0Silva/planet-chat-backend/assets/79770252/3cd7da25-806b-41cb-8dbb-44fd3cdd7205)

## Inicie um container Postgres

```bash
docker run -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres postgres --name=planetchatdb
```
**Em caso de erros ao iniciar o container, verifique se a porta 5432 está disponível na sua máquina.**

# Rodando o servidor

para inicar o servidor rode:
```bash
yarn start:dev
```

![image](https://github.com/P4ul0Silva/planet-chat-backend/assets/79770252/d1effaf5-94a0-42db-8950-a909410bf788)

