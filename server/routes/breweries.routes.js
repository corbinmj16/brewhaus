import { Router } from 'express'
import { getBreweries, getBreweryById } from '../controllers/breweries.controller.js'

const router = Router()

// Get all breweries
router.get('/', getBreweries)
// Get brewery by ID
router.get('/:id', getBreweryById)

export default router
