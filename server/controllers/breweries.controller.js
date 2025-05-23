export async function getBreweries(req, res) {
  // https://api.openbrewerydb.org/v1/breweries
  const { page = 1, per_page = 25 } = req.query
  try {
    const breweries = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=${per_page}`,
    )
    const data = await breweries.json()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching breweries' })
  }
}

export async function getBreweryById(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID is required' })
  }

  try {
    // https://api.openbrewerydb.org/v1/breweries/:id
    const brewery = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
    const data = await brewery.json()

    if (!data) {
      return res.status(404).json({ message: 'Brewery not found' })
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching brewery' })
  }
}
