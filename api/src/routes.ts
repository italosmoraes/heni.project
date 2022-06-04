import { Router } from 'express'
import { PrintsModule } from './modules/Prints/Prints'

export const router = Router()

router.get('/prints', PrintsModule.handler)
