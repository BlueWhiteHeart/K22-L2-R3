// const Core = require('@alicloud/pop-core')
// const _ = require('lodash')
// const Base = require('../../core/base_service')
// const Chance = require('chance')
// const moment = require('moment')

// class SMSService extends Base {
//   constructor (props) {
//     super(props)
//     this.client = null
//   }

//   getClient () {
//     if (!this.client) {
//       const props = _.pick(
//         this.app.config.sms,
//         ['accessKeyId', 'accessKeySecret', 'endpoint', 'apiVersion']
//       )
//       this.client = new Core(props)
//     }
//     return this.client
//   }

//   async send ({ phone, ...rest }) {
//     const params = {
//       ...rest,
//       PhoneNumbers: phone
//     }
//     const requestOption = {
//       method: 'POST'
//     }
//     const res = await this.getClient().request('SendSms', params, requestOption)
//     return res
//   }

//   async sendLoginTemplate (phone) {
//     const type = 'login'
//     const record = await this.findOneByPhoneAndType(phone, type, void 0, { raw: true })
//     if (record) {
//       const shouldStop = moment(record.created_at).valueOf() + 1000 * 60 >= Date.now()
//       if (shouldStop) {
//         throw new Error('请稍后再试')
//       }
//     }
//     const chance = new Chance()
//     const code = chance.string({
//       pool: '1234567890',
//       length: 6
//     })
//     const TemplateParam = JSON.stringify({ code })
//     await this.send({
//       ..._.pick(
//         this.app.config.sms,
//         ['RegionId', 'SignName', 'TemplateCode']
//       ),
//       TemplateParam,
//       phone
//     })
//     await this.SMS.create({
//       mobile: phone,
//       code,
//       type
//     })
//   }

//   findOneByPhoneAndType (phone, type, state, options = {}) {
//     return this.SMS.findOne({
//       where: { mobile: phone + '', type, state },
//       order: [ ['created_at', 'DESC'] ],
//       ...options
//     })
//   }
// }

// module.exports = SMSService
