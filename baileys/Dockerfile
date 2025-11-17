# Dockerfile para Baileys WhatsApp Client
FROM node:16

# Criar diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar arquivos do projeto
COPY . .

# Expor porta
EXPOSE 8000

# Comando de inicialização
CMD ["node", "index.js"]