- SSE 与 WebSocket 作用相似，都是建立浏览器与服务器之间的通信渠道，然后服务器向浏览器推送信息
    - WebSocket 是全双工通道，可以双向通信
    - SSE 是单向通道，只能服务器向浏览器发送

SSE VS WebSocket：

1. SSE 使用 HTTP 协议，现有的服务器软件都支持，WebSocket 是一个独立的协议
2. SSE 属于轻量级，使用简单；WebSocket 协议相对复杂
3. SSE 默认支持断线重连，WebSocket 需要自己实现
4. SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据
5. SSE 支持自定义发送的消息类型

在初始时客户端需要向服务端发送 http 请求，建立连接后会进行通信

消息格式，将会在 网络 → EventStream 展示发送的消息

```
message	Tue May 20 2025 12:21:01 GMT+0800 (China Standard Time)	
12:21:01.969
message	Tue May 20 2025 12:21:02 GMT+0800 (China Standard Time)	
12:21:02.966
message	Tue May 20 2025 12:21:03 GMT+0800 (China Standard Time)	
12:21:03.967
message	Tue May 20 2025 12:21:04 GMT+0800 (China Standard Time)	
12:21:04.968
message	Tue May 20 2025 12:21:05 GMT+0800 (China Standard Time)	
12:21:05.969
message	Tue May 20 2025 12:21:06 GMT+0800 (China Standard Time)	
12:21:06.970
```

客户端

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        const source = new EventSource('http://localhost:3200/stream', { withCredentials: true })
        source.onopen = (event) => {
            console.log('open', event)
        }
        source.onmessage = (event) => {
            console.log('message: ', event)
        }
        source.onerror = (event) => {
            console.log('error: ', event)
        }
    </script>
</body>
</html>
```

服务端

```jsx
const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "content-type": 'text/event-stream',
        'cache-control': 'no-cache',
        'connection': 'keep-alive',
        "access-control-allow-origin": 'http://127.0.0.1:5500',
        "access-control-allow-credentials": 'true',
        'access-control-expose-headers': '*',
        'access-control-allow-methods': '*'
    })

    const interval = setInterval(() => {
        res.write('data: ' + new Date() + '\n\n')
    }, 1000)

    req.connection.addListener('close', () => {
        clearInterval(interval)
    }, false)
})

server.listen(3200, 'localhost')
```