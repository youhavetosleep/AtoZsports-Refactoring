#!/bin/bash
cd /home/ubuntu/AtoZsports/server

export NODE_ENV=$(aws ssm get-parameters --region ap-northeast-2 --names NODE_ENV --query Parameters[0].Value | sed 's/"//g')
export COOKIE_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names COOKIE_SECRET --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export GMAIL_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GMAIL_ID --query Parameters[0].Value | sed 's/"//g')
export GMAIL_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names GMAIL_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export KAKAO_APP_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_APP_KEY --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js