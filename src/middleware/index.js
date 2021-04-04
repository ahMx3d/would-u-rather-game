import { applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "./logger"
import login from "./login"

export default applyMiddleware(thunk, logger, login)
