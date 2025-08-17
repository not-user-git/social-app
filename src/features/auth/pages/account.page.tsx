import { AccountForm } from '../compose/account-form'

const AccountPage = () => {
  return (
    <div className='flex-1 pl-3 overflow-auto'>
      <h4 className='text-xl mb-3 text-neutral-700 font-semibold leading-normal'>
        Редактировать аккаунт
      </h4>
      <AccountForm />
    </div>
  )
}

export default AccountPage
