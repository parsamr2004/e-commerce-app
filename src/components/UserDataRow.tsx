import { TableRow, TableCell } from "@/components/ui/table";
import type { userDataRow } from "@/types/user.admin";
import { Check, X, Edit, Trash2 } from "lucide-react";

const UserDataRow = ({
  user,
  editingEmailUser,
  editingNameUser,
  newEmail,
  newName,
  onEditEmail,
  onEditName,
  onEmailChange,
  onNameChange,
  onSave,
  onToggleAdmin,
  onDelete,
}: userDataRow) => {
  const isEditingEmail = editingEmailUser?._id === user._id;
  const isEditingName = editingNameUser?._id === user._id;

  return (
    <TableRow className="border-b border-gray-200 even:bg-gray-100 dark:even:bg-neutral-800">
      <TableCell className="text-right text-xs sm:text-sm break-all dark:text-white">
        {user._id}
      </TableCell>

      <TableCell className="text-right py-2">
        <div className="flex items-center justify-start gap-2">
          {isEditingName ? (
            <>
              <Check
                onClick={onSave}
                className="w-6 h-6 text-white bg-[#00B8D9] p-1 rounded hover:bg-[#008bbd] cursor-pointer"
              />
              <input
                className="w-full max-w-xs bg-white dark:bg-[#3F4043] px-2 py-1 rounded border border-gray-300 dark:border-gray-700 text-sm focus:outline-none"
                type="text"
                value={newName}
                placeholder={user.username}
                onChange={(e) => onNameChange(e.target.value)}
              />
            </>
          ) : (
            <>
              <Edit
                onClick={() => onEditName(user)}
                className="w-4 h-4 cursor-pointer hover:text-[#00B8D9] transition-colors"
              />
              <span className="font-medium text-sm">{user.username}</span>
            </>
          )}
        </div>
      </TableCell>

      <TableCell className="text-right py-2">
        <div className="flex items-center justify-start gap-2">
          {isEditingEmail ? (
            <>
              <Check
                onClick={onSave}
                className="w-6 h-6 text-white bg-[#00B8D9] p-1 rounded cursor-pointer hover:bg-[#008bbd]"
              />
              <input
                autoFocus
                className="w-full max-w-xs bg-white dark:bg-[#3F4043] px-2 py-1 rounded border border-gray-300 dark:border-gray-700 text-sm focus:outline-none"
                type="text"
                value={newEmail}
                placeholder={user.email}
                onChange={(e) => onEmailChange(e.target.value)}
              />
            </>
          ) : (
            <>
              <Edit
                onClick={() => onEditEmail(user)}
                className="w-4 h-4 cursor-pointer hover:text-[#00B8D9] transition-colors"
              />
              <span className="text-xs sm:text-sm break-all">{user.email}</span>
            </>
          )}
        </div>
      </TableCell>

      <TableCell className="text-right py-2 px-2">
        {user.isAdmin ? (
          <Check
            onClick={() => onToggleAdmin(user)}
            className="text-green-700 dark:text-green-500 w-4 h-4 cursor-pointer hover:text-green-800 dark:hover:text-green-400"
          />
        ) : (
          <X
            onClick={() => onToggleAdmin(user)}
            className="text-red-700 dark:text-red-500 w-4 h-4 cursor-pointer hover:text-red-500 dark:hover:text-red-400"
          />
        )}
      </TableCell>

      <TableCell className="text-right py-2 px-2">
        <Trash2
          onClick={() => onDelete(user._id)}
          className="text-red-700 w-5 h-5 cursor-pointer rounded-full hover:text-red-500 transition-colors"
        />
      </TableCell>
    </TableRow>
  );
};

export default UserDataRow;

