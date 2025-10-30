<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
  
    public function index()
    {
        try{
            $tasks = Task::where('user_id', Auth::id())->latest()->get();
            return response()->json(['status'=>true,'message'=>'SUCCESS','data'=>$tasks],200);

        }
        catch(\Throwable $e)
        {
            return response()->json(['status'=>false,'message'=>$e->getMessage()],500);

        }
        
    }

    
    public function store(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'nullable|string|max:1000',
            ]);

              if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Missing Required Parameters',
                ], 422);
            }   
           
            $task = Task::create([
                'user_id' => Auth::id(),
                'title' => $request->title,
                'description' => $request->description ?? null,
            ]);

            return response()->json([
                'message' => 'Task created successfully',
                'task' => $task,
            ], 200);
        }
         catch(\Throwable $e)
        {
            return response()->json(['status'=>false,'message'=>$e->getMessage()],500);

        }

    }

   
    public function update(Request $request, $id)
    {
        try {
            $task = Task::where('user_id', Auth::id())->findOrFail($id);
           
            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string|max:1000',
                'completed' => 'nullable|boolean',
            ]);

          
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Missing Required Parameters',
                ], 422);
            }
           
            $task->update($validator->validated());

            return response()->json([
                'status' => true,
                'message' => 'Task updated successfully',
                'task' => $task,
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }   
    }

    
    public function destroy($id)
    {
        try{
             $task = Task::where('user_id', Auth::id())->findOrFail($id);
             $task->delete();

            return response()->json(['status'=>true,'message' => 'Task deleted successfully'],200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }   
       
    }
}

