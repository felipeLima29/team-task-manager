#!/bin/bash

echo "Subindo containers..."
docker compose up -d

echo "Esperando banco iniciar..."
sleep 5

echo "Sincronizando banco..."
node src/database/sync.js

echo "Tudo pronto."