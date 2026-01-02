export function evaluateLogic({
  questionId,
  answer,
  logicRules
}: {
  questionId: number;
  answer: any;
  logicRules: any[];
}) {
  const skip = new Set<number>();
  const show = new Set<number>();

  logicRules
    .filter(r => r.source_question_id === questionId)
    .forEach(rule => {
      const values = JSON.parse(rule.value);

      const matched =
        rule.operator === 'in'
          ? values.some((v: any) =>
              Array.isArray(answer) ? answer.includes(v) : answer === v
            )
          : false;

      if (matched) {
        rule.action === 'skip'
          ? skip.add(rule.target_question_id)
          : show.add(rule.target_question_id);
      }
    });

  return { skip, show };
}
