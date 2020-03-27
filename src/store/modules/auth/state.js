import { StorageService } from '@/services/storage.service'

export default {
  authRequestWaiting: true,
  phoneNumber: '',
  accessToken: StorageService.getToken() || '',
  idCustomer: StorageService.getIdCustomer() || '',
  preAuth: StorageService.getPreToken() || ''
}
