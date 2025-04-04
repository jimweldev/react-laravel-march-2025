import { RbacRolePermission } from './rbac-role-permission';

export interface RbacRole {
  id?: number;
  label?: string;
  value?: string;
  rbac_role_permissions?: RbacRolePermission[];
  created_at?: string;
  updated_at?: string;
}
