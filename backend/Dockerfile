FROM golang:1.14 as builder

COPY . /go/src/github.com/RedVentures/hackathon-go-base/

WORKDIR /go/src/github.com/RedVentures/hackathon-go-base/cmd/server

RUN CGO_ENABLED=0 go build -v

FROM alpine:3.10.2

RUN apk --no-cache add ca-certificates
WORKDIR backend/home/app
COPY --from=builder /go/src/github.com/RedVentures/hackathon-go-base/cmd/server/server .

CMD ./server