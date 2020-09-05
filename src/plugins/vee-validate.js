import { extend, configure } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'
import i18n from '../lang/index'

configure({
    defaultMessage: (field, values) => {
        // override the field name.
        values._field_ = i18n.t(`fields.${field}`)

        return i18n.t(`validation.${values._rule_}`, values)
    }
})

// Install required rule and message.
extend('required', required)

// Install email rule and message.
extend('email', email)

// Install min rule and message.
extend('min', min)
