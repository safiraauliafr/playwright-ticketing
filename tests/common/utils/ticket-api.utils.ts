import { APIRequestContext } from 'playwright-core'
import { STORAGE_STATE } from '@/playwright.config'

export class TicketApiUtils {
  constructor(private request: APIRequestContext) {}

  async findTicketByCarPlate(carPlate: string) {
    const auth = require(STORAGE_STATE)

    const accessToken = auth.cookies.find((cookie: { name: string }) => cookie.name === 'accessToken') || { value: '' }

    const response = await this.request.get(`https://ticket-api.qa.getcars.dev/api/v1/tickets`, {
      params: {
        include: 'group,tags,owner:more(ticket_count),assignTeam,listings.channels',
        inventory_licence_plate_number: carPlate,
        page: '1',
        sort: '-id',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    const responseData = await response.json()
    return responseData.data[0].id || null
  }
}
