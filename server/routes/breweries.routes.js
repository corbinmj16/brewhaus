import { Router } from 'express'
import {
  getBreweries,
  getBreweryById,
  getBreweryBySearch,
} from '../controllers/breweries.controller.js'

const router = Router()

// Get all breweries
router.get('/', getBreweries)
// Get brewery by ID
router.get('/:id', getBreweryById)
// Get by search query
router.get('/search', getBreweryBySearch)

export default router
