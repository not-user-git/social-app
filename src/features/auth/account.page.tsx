import { AccountForm } from './compose/account-form'
import { useDocumentTitle } from '@/shared/hooks/use-document-title'

const AccountPage = () => {
  useDocumentTitle('account')
  return (
    <div className='flex-1 px-4 sm:pl-2 overflow-auto'>
      <h4 className='text-xl py-4 text-neutral-700 font-semibold leading-normal'>
        Редактировать аккаунт
      </h4>
      <AccountForm />
    </div>
  )
}

export default AccountPage
