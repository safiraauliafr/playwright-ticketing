import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.TEST_ENV || 'qa'}`),
  override: true,
})

const projectRoot = process.cwd();

export const config = {
  env: process.env.TEST_ENV || 'qa',
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    name: process.env.DB_NAME || 'carro_db',
    port: parseInt(process.env.DB_PORT || '3306'),
  },
  credentials: {
    auth: {
      sso: {
        username: process.env.SSO_USERNAME || '',
        password: process.env.SSO_PASSWORD || '',
      },
    },
  },
  domains: {
    crazyRabbit: {
      baseUrl: process.env.CRAZY_RABBIT_BASE_URL || '',
      apiUrl: process.env.CRAZY_RABBIT_API_URL || '',
      otpApiUrl: process.env.CRAZY_RABBIT_OTP_API_URL || '',
      viewingScheduleApiUrl: process.env.CRAZY_RABBIT_VIEWING_SCHEDULE_API_URL || '',
      sellRequestApiUrl: process.env.CRAZY_RABBIT_SELL_REQUEST_API_URL || '',
    },
    auth: {
      sso: {
        baseUrl: process.env.SSO_BASE_URL || '',
      },
    },
    captain: {
      baseUrl: process.env.CAPTAIN_BASE_URL || '',
    } as {
      baseUrl: string;
    },
    eternal: {
      baseUrl: process.env.ETERNAL_BASE_URL || '',
    },
    recond: {
      baseUrl: process.env.RECOND_BASE_URL,
      apiUrl: process.env.RECOND_API_URL,
      features: {
        sellCar: true,
        listingManagement: true,
        privateSeller: true,
      },
    },
    inventory: {
      baseUrl: process.env.INVENTORY_BASE_URL,
      apiUrl: process.env.INVENTORY_API_URL,
      features: {
        dealerOperations: true,
        stockControl: true,
      },
    },
    quotation: {
      baseUrl: process.env.QUOTATION_BASE_URL || '',
    } as {
      baseUrl: string;
    },
  },
  auth: {
    captain: {
      email: process.env.CAPTAIN_USER_EMAIL || '',
      password: process.env.CAPTAIN_USER_PASSWORD || '',
    },
    dealer: {
      email: process.env.DEALER_USER_EMAIL || '',
      password: process.env.DEALER_USER_PASSWORD || '',
    },
  },
  testData: {
    buyer: {
      name: process.env.DEFAULT_BUYER_NAME || 'John Doe',
      email: process.env.DEFAULT_BUYER_EMAIL || '',
      phone: process.env.DEFAULT_BUYER_PHONE || '',
      phoneForSubmitDrive: process.env.DEFAULT_BUYER_PHONE_FOR_SUBMIT_DRIVE || '',
      nric: process.env.DEFAULT_BUYER_NRIC || '',
      gender: process.env.DEFAULT_BUYER_GENDER || '',
      race: process.env.DEFAULT_BUYER_RACE || '',
    },
    seller: {
      phone: process.env.DEFAULT_SELLER_PHONE || '',
    },
    car: {
      searchQuery: process.env.DEFAULT_CAR_SEARCH_QUERY || 'Toyota',
      make: process.env.DEFAULT_CAR_MAKE || 'Toyota',
      model: process.env.DEFAULT_CAR_MODEL || 'Vios',
      variant: process.env.DEFAULT_CAR_VARIANT || '1.5E',
      year: process.env.DEFAULT_CAR_YEAR || '2015',
      mileage: process.env.DEFAULT_CAR_MILEAGE || '100000',
      carPlate: process.env.CAR_PLATE || '',
    },
    payment: {
      cardNumber: process.env.DEFAULT_CARD_NUMBER,
      bankName: process.env.DEFAULT_BANK_NAME,
    },
  },
  files: {
    photoPath: process.env.UPLOAD_PHOTO_PATH,
    docPath: process.env.UPLOAD_DOC_PATH,
    signaturePath: process.env.UPLOAD_SIGNATURE_PATH,    
    uploadPath : path.join(projectRoot,'upload-file-photo/'),
  },
}
