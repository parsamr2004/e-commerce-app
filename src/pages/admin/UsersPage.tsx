import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow } from "@/components/ui/table";
import UserDataRow from "@/components/UserDataRow";
import { useUpdateUser } from "@/hooks/use-update-user";
import { useDeleteUser } from "@/hooks/use-delete-user";
import useChangeRole from "@/hooks/use-change-role";
import type { User } from "@/types/user.admin";
import useUsersAdmin from "@/hooks/use-user-admin";
import useAuthStore from "@/stores/use-auth-store";

const UsersPage: React.FC = () => {
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: ChangeRole } = useChangeRole();

  const { data, isLoading, isError } = useUsersAdmin();
  const { reset } = useAuthStore();
  const [editingEmailUser, setEditingEmailUser] = useState<User | null>(null);
  const [editingNameUser, setEditingNameUser] = useState<User | null>(null);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) {
    reset();
    return <p>خطا در دریافت کاربران</p>;
  }

  const handleSave = () => {
    if (editingEmailUser) {
      updateUser({
        _id: editingEmailUser._id,
        email: newEmail,
        username: editingEmailUser.username,
        isAdmin: editingEmailUser.isAdmin,
      });
    }
    if (editingNameUser) {
      updateUser({
        _id: editingNameUser._id,
        username: newName,
        email: editingNameUser.email,
        isAdmin: editingNameUser.isAdmin,
      });
    }
    setEditingEmailUser(null);
    setEditingNameUser(null);
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
  };

  const handleEditEMail = (user: User) => {
    setEditingNameUser(null);
    setEditingEmailUser(user);
    setNewEmail(user.email);
  };

  const handleEditName = (user: User) => {
    setEditingNameUser(user);
    setEditingEmailUser(null);
    setNewName(user.username);
  };

  const handleToggleAdmin = (user: User) => {
    ChangeRole({ _id: user._id, isAdmin: !user.isAdmin });
  };

  return (
    <div className="mt-10 w-full overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 text-right text-xs font-semibold whitespace-nowrap sm:text-sm">
              ID
            </TableHead>
            <TableHead className="py-2 text-right text-xs font-semibold whitespace-nowrap sm:text-sm">
              نام
            </TableHead>
            <TableHead className="py-2 text-right text-xs font-semibold whitespace-nowrap sm:text-sm">
              ایمیل
            </TableHead>
            <TableHead className="py-2 text-right text-xs font-semibold whitespace-nowrap sm:text-sm">
              ادمین
            </TableHead>
            <TableHead className="py-2 text-right text-xs font-semibold whitespace-nowrap sm:text-sm">
              عملیات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user) => (
            <UserDataRow
              key={user._id}
              user={user}
              onDelete={handleDelete}
              onEditEmail={handleEditEMail}
              onEditName={handleEditName}
              editingEmailUser={editingEmailUser}
              editingNameUser={editingNameUser}
              newEmail={newEmail}
              newName={newName}
              onEmailChange={setNewEmail}
              onNameChange={setNewName}
              onSave={handleSave}
              onToggleAdmin={handleToggleAdmin}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
