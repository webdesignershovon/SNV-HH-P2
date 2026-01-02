'use client';
import { useEffect, useState } from 'react';
import { evaluateLogic } from '@/lib/logicEngine';
import { supabase } from '@/lib/supabase';

export default function FormPage() {
  const [questions,setQuestions]=useState<any[]>([]);
  const [logic,setLogic]=useState<any[]>([]);
  const [validations,setValidations]=useState<any[]>([]);
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState<any>({});
  const [skipped,setSkipped]=useState<Set<number>>(new Set());

  useEffect(()=>{
    fetch('/api/questions')
      .then(res=>res.json())
      .then(d=>{
        setQuestions(d.questions);
        setLogic(d.logic);
        setValidations(d.validations);
      });
  },[]);

  if(!questions.length) return <p>Loading…</p>;

  const q = questions[index];
  if(skipped.has(q.id)) {
    setIndex(i=>i+1);
    return null;
  }

  const validation = validations.find((v:any)=>v.question_id===q.id);

  const next = (answer:any) => {
    if(validation?.is_required && !answer) {
      alert(validation.error_message);
      return;
    }

    const logicResult = evaluateLogic({
      questionId: q.id,
      answer,
      logicRules: logic
    });

    const newSkipped = new Set(skipped);
    logicResult.skip.forEach(id=>newSkipped.add(id));
    setSkipped(newSkipped);

    setAnswers({...answers,[q.id]:answer});
    setIndex(index+1);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="font-bold mb-2">{q.question_text}</h2>

      <QuestionRenderer question={q} onNext={next} />

    </div>
  );
}
