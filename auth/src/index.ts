import express, { json } from "express";
import "express-async-errors";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-users";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

const app = express();
const PORT = 3000;

app.use(json());

app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(currentUserRouter);

app.use(errorHandler);

app.all("*", () => {
  throw new NotFoundError();
});

app.listen(PORT, () => {
  console.log(
    `Auth Service v${process.env.npm_package_version} started on PORT: ${PORT}`
  );
});
