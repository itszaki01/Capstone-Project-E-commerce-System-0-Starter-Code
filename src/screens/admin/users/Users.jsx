import React from 'react'
import AdminTopToolbar from '../../../components/common/toolbar/AdminTopToolbar'
import UsersTable from './components/UsersTable';
import { useGetAllUsersQuery } from '../../../redux/services/users/userApiService';

const Users = () => {
  const {data,isLoading} = useGetAllUsersQuery()
  return (
    <>
     <AdminTopToolbar
        heading="Users"
        isLoading={isLoading}
        totalCount={data?.length}
      />
      <UsersTable isLoading={isLoading} data={data}/>
    </>

  )
}

export default Users