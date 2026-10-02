const form=document.getElementById("quizForm");
const startPanel=document.getElementById("startPanel");
const resultPanel=document.getElementById("resultPanel");
const scoreText=document.getElementById("scoreText");
const review=document.getElementById("review");
const reward=document.getElementById("reward");
const exportBtn=document.getElementById("exportBtn");

let currentQuestions=[];
let startedAt=null;
let lastAttempt=null;

function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function materialize(q){return typeof q.generate==="function"?q.generate():{...q}}

function start(){
  startPanel.classList.add("hidden");
  resultPanel.classList.add("hidden");
  form.classList.remove("hidden");
  startedAt=new Date();
  currentQuestions=shuffle(window.QUESTION_BANK).slice(0,10).map(materialize);

  form.innerHTML=currentQuestions.map((q,i)=>`
    <section class="question">
      <div class="meta">${q.topic} · ${i+1}/10</div>
      <h3>${q.q}</h3>
      ${q.visual||""}
      ${q.options.map((o,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join("")}
    </section>`).join("")+`<button type="submit">交卷</button>`;
  window.scrollTo({top:0,behavior:"smooth"});
}

form.addEventListener("submit",e=>{
  e.preventDefault();
  let score=0, html="";
  const finishedAt=new Date();
  const answers=[];

  currentQuestions.forEach((q,i)=>{
    const picked=form.querySelector(`input[name="q${i}"]:checked`);
    const val=picked?Number(picked.value):-1;
    const ok=val===q.answer;
    if(ok) score++;

    answers.push({
      id:q.id,
      topic:q.topic,
      question:q.q,
      options:q.options,
      selected_index:val,
      selected_answer:val>=0?q.options[val]:null,
      correct_index:q.answer,
      correct_answer:q.options[q.answer],
      is_correct:ok
    });

    html+=`<section class="question">
      <div class="${ok?"correct":"wrong"}">${ok?"✓ Correct":"✗ Review"}</div>
      <h3>${q.q}</h3>
      ${!ok?`<p>正确答案：<strong>${q.options[q.answer]}</strong></p>`:""}
      <div class="explain">${q.explain}</div>
    </section>`;
  });

  lastAttempt={
    app:"Take Me to the Clouds",
    version:"0.2",
    started_at:startedAt?.toISOString()||null,
    finished_at:finishedAt.toISOString(),
    score,
    total:currentQuestions.length,
    answers
  };

  form.classList.add("hidden");
  resultPanel.classList.remove("hidden");
  scoreText.textContent=`${score} / ${currentQuestions.length}`;
  reward.textContent=score===currentQuestions.length?"PIC privilege unlocked ♥":"Keep flying ✈️";
  review.innerHTML=html;
  window.scrollTo({top:0,behavior:"smooth"});
});

function exportAttempt(){
  if(!lastAttempt)return;
  const blob=new Blob([JSON.stringify(lastAttempt,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download=`take-me-to-the-clouds-attempt-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

document.getElementById("startBtn").addEventListener("click",start);
document.getElementById("retryBtn").addEventListener("click",()=>{
  resultPanel.classList.add("hidden");
  startPanel.classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
});
exportBtn.addEventListener("click",exportAttempt);