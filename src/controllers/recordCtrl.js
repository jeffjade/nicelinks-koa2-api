const { Record } = require('./../models/index')
const $constant = require('./../config/constant')

exports.updateActivedUserNum = async (number) => {
  const key = $constant.ACTIVED_USERS_NUM
  const recordSetting = {
    key: key,
    value: number,
    updated: Date.now()
  }
  await Record.update({ key: key }, { $set: recordSetting }).then(result => {
    console.log(`✔️ recordCtrl[@updateRegisterUserNum] result: `, result)
  })
}

exports.setActivedUserNum = async (number) => {
  const key = $constant.ACTIVED_USERS_NUM
  const params = {
    key: key,
    value: number
  }
  await Record.create(params).then(result => {
    console.log(`✔️ recordCtrl[@setActivedUserNum] result: `, result)
  })
}

exports.getActivedUserNum = () => {
  const key = $constant.ACTIVED_USERS_NUM
  return new Promise((resolve, reject) => {
    Record.findOne({ key: key }, (err, result) => {
      console.log(`✔️ recordCtrl[@getActivedUserNum] result: `, result)
      err ? reject(err) : resolve(result)
    })
  })
}