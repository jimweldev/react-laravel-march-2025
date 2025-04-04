<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\RbacRolePermission;

class RbacRole extends Model {
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function rbac_role_permissions() {
        return $this->hasMany(RbacRolePermission::class, 'rbac_role_id', 'id'); 
    }

    public function rbac_permissions() {
        return $this->belongsToMany(RbacPermission::class, 'rbac_role_permissions', 'rbac_role_id', 'rbac_permission_id');
    }
}