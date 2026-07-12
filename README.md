# ✅ CheckTécnico

App de campo para técnicos de provedor de internet (fibra óptica). O técnico registra a ficha técnica de cada instalação — dados do cliente, CTO/rede externa, fotos comprobatórias, Wi‑Fi e finalização — com localização capturada na hora e exportação em PDF.

**React Native (Expo) · Supabase**

## Como funciona

1. **Login** com usuário pré-cadastrado (contas são criadas apenas pelo administrador — sem cadastro aberto).
2. **Ficha técnica** em 5 seções:
   - **Dados do cliente** — nome, rua/número e link de localização (GPS atual ou colado do Maps)
   - **CTO / rede externa** — localização da CTO (capturada no local), foto, cor da fibra, splitter e porta
   - **Casa do cliente** — localização e foto da frente
   - **Instalação interna** — fotos do equipamento e do MAC, nome e senha do Wi‑Fi
   - **Finalização** — teste de navegação e satisfação do cliente
3. **Salvar** — a ficha fica guardada e pode ser consultada depois.
4. **Consulta** — lista de fichas classificada por período (mês/ano).
5. **PDF** — exporta a ficha completa, com fotos, para baixar ou compartilhar.

**Acesso demo:** os campos de login já vêm preenchidos — é só clicar em **Entrar**.

## Stack

- **Expo SDK 54** + React Native (iOS, Android e Web com o mesmo código)
- **Supabase**: Postgres + RLS (cada técnico só acessa as próprias fichas), Auth com cadastro desabilitado (contas criadas pelo administrador)
- **expo-location** — captura da posição atual e link do Google Maps
- **expo-image-picker** — câmera/galeria com compressão de imagem
- **expo-print + expo-sharing** — geração e compartilhamento do PDF

## Banco de dados

| Tabela | Papel |
|---|---|
| `users` | perfil do técnico, espelhado de `auth.users` |
| `checklists` | fichas de instalação (dados, flags e fotos) |

## Rodando local

```bash
npm install
cp .env.example .env   # preencha com seu projeto Supabase
npm run web
```

Configure um projeto Supabase com as tabelas acima, RLS por `user_id` e um usuário para o técnico em Authentication (com signup desabilitado).
