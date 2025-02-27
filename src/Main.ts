import { HttpMiddleware, HttpRouter, HttpServer } from "@effect/platform";
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node";
import { Effect, Layer } from "effect";
import { createServer } from "http";

const myLogger = HttpMiddleware.make((app) =>
    Effect.gen(function* () {
      return yield* app
    })
  )

const ServerLive = NodeHttpServer.layer(createServer, { port: 8080, host: "localhost" })

const HttpLive = HttpRouter.Default.unwrap(HttpServer.serve(myLogger)).pipe(
    Layer.provide(ServerLive),
)

NodeRuntime.runMain(Layer.launch(HttpLive))