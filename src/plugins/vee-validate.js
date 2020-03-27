import { extend, setInteractionMode } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

setInteractionMode('passive')

extend('required', required)
extend('email', email)
