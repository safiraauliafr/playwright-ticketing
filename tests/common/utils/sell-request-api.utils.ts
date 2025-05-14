import { APIRequestContext } from 'playwright-core'
import { RABBIT_STORAGE_STATE } from '@/playwright.config'

export class SellRequestApiUtils {
  constructor(private request: APIRequestContext) {}

  async retrieveInspectionCenters() {
    const response = await this.request.get('https://qa-crazy-rabbit-api.getcars.dev/api/v1/rabbit/my/config/options', {
      params: {
        'types[0][name]': 'inspection_center_provinces',
      },
      headers: {
        accept: 'application/json, text/plain, */*',
      },
    })

    if (!response.ok()) {
      throw new Error(`Failed to retrieve inspection center: ${response.status()} ${response.statusText()}`)
    }

    const responseJson = await response.json()
    return responseJson.data.inspection_center_provinces
  }

  async retrieveInspectionLocations(provinceId: string) {
    const response = await this.request.get('https://qa-crazy-rabbit-api.getcars.dev/api/v1/rabbit/my/inspection-location', {
      params: {
        province_id: provinceId,
      },
      headers: {
        accept: 'application/json, text/plain, */*',
      },
    })

    if (!response.ok()) {
      throw new Error(`Failed to retrieve inspection locations: ${response.status()} ${response.statusText()}`)
    }

    const responseJson = await response.json()
    return responseJson.data
  }

  async retrieveAppointmentBookingConfig(locationId: string) {
    const response = await this.request.get('https://qa-crazy-rabbit-api.getcars.dev/api/v1/rabbit/my/config/options', {
      params: {
        'types[0][name]': 'config_appointment_booking',
        'types[0][filter]': 'rabbit',
        'types[0][filter2]': locationId,
        'types[0][filter3]': 'prebooking',
      },
      headers: {
        accept: 'application/json, text/plain, */*',
      },
    })

    if (!response.ok()) {
      throw new Error(`Failed to retrieve appointment booking config: ${response.status()} ${response.statusText()}`)
    }

    const responseJson = await response.json()
    return responseJson.data.config_appointment_booking
  }

  async retrieveTimeSlots(startDate: string, endDate: string, locationId: string) {
    const auth = require(RABBIT_STORAGE_STATE)
    const accessToken = auth.cookies.find((cookie: { name: string }) => cookie.name === 'accessToken') || { value: '' }

    const response = await this.request.get('https://qa-crazy-rabbit-api.getcars.dev/api/v1/rabbit/my/time-slot', {
      params: {
        start_date: startDate,
        end_date: endDate,
        location_id: locationId,
      },
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${accessToken.value}`,
        // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjdkOTBjNTA0ZGQ2MGM5NTFmZTY2NWVkOGU2NjI0NzhjY2M1ZmVmN2MxY2ViODkzNmZmYmNlZjUwZjJkYTFkOTRlYjllZWM5YmY4YzdiODUzIiwiaWF0IjoxNzQyMjk0OTM4LjQ0NjUxMiwibmJmIjoxNzQyMjk0OTM4LjQ0NjUxNSwiZXhwIjoxNzQyODk5NzM4LjQzMzU5LCJzdWIiOiI2NDU4Iiwic2NvcGVzIjpbXX0.qlI5j1OKhejdWxF6LEbLRImoamJCHBVritkpjuR6UDjH8hPUKmu-ioLmr0h-90mPVN2DnFG68jFyviUmaoIUIfyvvAv2z3Mcz9Rri4HFvAdX98npINMZ4wj-Jfz6BN9Q3lOKgdm4JDB-ZyVtitovjcfLPiQ_75u4O3PrAgCKw2bzU2zBMhe9bZnn3XUD4hFqd2hrqXgev2Ps9y6ABXIhD1JL6DYnHtgbzfSfdbf1thNLlx9_pCT4RdF2RY3t5x8FbOqZmhZUV9XkhixKsjfamjaAi9-XyYmHPX6HQqbQW1FZ7AMe3pGdssgAQwJOOxGaKvRy422OxHaxml4wPCggGSnsQdQiCSEGUtyBZMLNA4OT5MvJFqwckK9u68f_4YTnPOqeatWj30vb8lpNpgEftLjr5WmRxYAXHHIFRspGdIwSfHT6DIylupwEv0dWusBu-t9x3RfqDl4J1RJud52F9BQ3ZKzBWbPZd-yGVaIo-EgcqhQLjVxOMW7KX3Ov8Q0oMngjArtAnwfQ-9RydZXeJFcjxCdjNzjXtKhLNxQSAFtHolaXF9ae8ImrcdD9uLCP27HjwX2FM-KfMIlKeIP6TqU9iFZFJCOubo_228aMQTFdlGa_fot93MFq0ceZxzTjv5pbFwNjoKiaKrhwJnMhFFhUKkwkdVHeuLO1XKhSCr0`,
      },
    })

    if (!response.ok()) {
      throw new Error(`Failed to retrieve time slots: ${response.status()} ${response.statusText()}`)
    }

    const responseJson = await response.json()
    return responseJson.data
  }
}
