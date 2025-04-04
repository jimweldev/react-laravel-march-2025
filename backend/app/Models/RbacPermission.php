<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\RbacRole;

class RbacPermission extends Model {
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    // public function rbac_roles() {
    //     return $this->belongsToMany(RbacRole::class, 'rbac_role_permissions', 'rbac_permission_id', 'rbac_role_id');
    // }
}