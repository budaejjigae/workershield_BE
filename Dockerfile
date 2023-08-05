# 프로젝트의 노드 버전 = node 18.14.0
FROM node:18

# /app이라는 폴더 생성
RUN mkdir -p /src

# /app이라는 폴더에서 프로젝트 실행
WORKDIR /src

# 현재 폴더에 있는 모든 내용을 /app으로 복사
COPY . .

# 프로젝트에서 사용한 패키지를 모두 설치 (package.json)
RUN npm install

# 8088번 포트 사용
EXPOSE 8088

# 프로젝트 빌드 시 생성되는 dist 폴더의 main.js를 실행
CMD ["npm", "start"]