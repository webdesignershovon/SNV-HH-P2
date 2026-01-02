'use client';
import { useState } from 'react';

export default function QuestionRenderer({question,onNext}:any){
  const [value,setValue]=useState<any>(null);

  switch(question.question_type){

    case 'radio':
      return question.options.map((o:string)=>(
        <button key={o} onClick={()=>onNext(o)}>{o}</button>
      ));

    case 'checkbox':
      return (
        <>
          {question.options.map((o:string)=>(
            <label key={o}>
              <input
                type="checkbox"
                onChange={e=>{
                  setValue((v:any[]=[])=>{
                    if(e.target.checked) return [...v,o];
                    return v.filter(x=>x!==o);
                  });
                }}
              /> {o}
            </label>
          ))}
          <button onClick={()=>onNext(value)}>Next</button>
        </>
      );

    case 'number':
      return (
        <>
          <input type="number" onChange={e=>setValue(e.target.value)} />
          <button onClick={()=>onNext(value)}>Next</button>
        </>
      );

    case 'text':
      return (
        <>
          <textarea onChange={e=>setValue(e.target.value)} />
          <button onClick={()=>onNext(value)}>Next</button>
        </>
      );

    case 'image':
      return (
        <>
          <input type="file" accept="image/*"
            onChange={async e=>{
              const file=e.target.files?.[0];
              const {data}=await supabase.storage
                .from('form-images')
                .upload(`img-${Date.now()}`,file!);
              onNext(data?.path);
            }}
          />
        </>
      );

    case 'confirmation':
      return (
        <>
          <button onClick={()=>onNext(true)}>Confirm</button>
          {question.id===3 && <WrongDataLockout />}
        </>
      );
  }

  return null;
}
