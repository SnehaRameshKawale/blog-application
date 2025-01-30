<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function sendResponse($result, $message){
        $response = [
            'status' => true,
            'data' => $result,
            'message' => $message,
        ];

        return response()->json($response,200);
    }

    public function sendError($error, $errorMessage = [], $code = 401){
        $response = [
            'status' => false,
            'error' => $error,
        ];

        if(!empty($errorMessage)){
            $response['errorMessage'] = $errorMessage;
        }

        return response()->json($response,$code);
    }
}
