<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\RbacRolePermission;

class RbacUserRole extends Model {
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function rbac_role() {
        return $this->hasOne(RbacRole::class, 'id', 'rbac_role_id');
    }
}