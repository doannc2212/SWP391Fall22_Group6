docker build -t nest-prisma-server .
docker run -d -t -p 8079:800 nest-prisma-server