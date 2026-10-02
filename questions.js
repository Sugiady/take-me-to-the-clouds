function shuffleOptions(correct, distractors){
  const options=[correct,...distractors].sort(()=>Math.random()-.5);
  return {options,answer:options.indexOf(correct)};
}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}
function classEVisual(kind){
  if(kind==="surface"){
    return '<div class="question-visual"><svg viewBox="0 0 560 150" role="img" aria-label="schematic airport surrounded by dashed magenta Class E surface boundary"><rect width="560" height="150" fill="#f8fbfd"/><circle cx="280" cy="75" r="54" fill="none" stroke="#b23a86" stroke-width="5" stroke-dasharray="12 8"/><line x1="245" y1="75" x2="315" y2="75" stroke="#17212b" stroke-width="5"/><line x1="280" y1="58" x2="280" y2="92" stroke="#17212b" stroke-width="3"/><text x="280" y="137" text-anchor="middle" font-size="13" fill="#66727f">schematic · not to scale</text></svg></div>';
  }
  return '<div class="question-visual"><svg viewBox="0 0 560 150" role="img" aria-label="schematic magenta vignette indicating Class E floor at 700 feet AGL"><defs><linearGradient id="mg" x1="0" x2="1"><stop offset="0" stop-color="#b23a86" stop-opacity="0"/><stop offset="1" stop-color="#b23a86" stop-opacity=".65"/></linearGradient></defs><rect width="560" height="150" fill="#f8fbfd"/><rect x="160" y="22" width="70" height="106" fill="url(#mg)"/><line x1="230" y1="20" x2="230" y2="130" stroke="#b23a86" stroke-width="2"/><text x="300" y="63" font-size="17" fill="#17212b">Class E floor ≈ 700 ft AGL</text><text x="300" y="90" font-size="15" fill="#66727f">below it: usually Class G</text><text x="280" y="137" text-anchor="middle" font-size="13" fill="#66727f">schematic · not to scale</text></svg></div>';
}

window.QUESTION_BANK = [
  {
    id:"stall-1", topic:"Aerodynamics",
    q:"飞机失速的直接原因是什么？",
    options:["Airspeed 低于某个固定值","Engine power 不足","Angle of attack 超过 critical AoA","Pitch attitude 太高"],
    answer:2,
    explain:"失速的直接原因是超过临界迎角。它可以发生在不同 airspeed 下。"
  },
  {
    id:"turn-1", topic:"Aerodynamics",
    q:"建立约 20° right bank 后，想保持 bank，通常如何处理 aileron？",
    options:["持续向右压","大致回 neutral，再小幅修正","向左打到底","主要用 elevator 保持 bank"],
    answer:1,
    explain:"Aileron 主要用来建立/改变 bank。建立后通常回近中立位并做小修正。"
  },
  {
    id:"turn-2", topic:"Aerodynamics",
    q:"为什么 level turn 中 stall speed 会升高？",
    options:["因为 ground speed 一定下降","因为总 lift 需求增大、load factor 上升","因为 rudder 会减小升力","因为 altimeter setting 改变"],
    answer:1,
    explain:"升力向量倾斜后，垂直分量仍需平衡 weight，因此总 lift 需求、load factor 和所需 AoA 上升。"
  },
  {
    id:"fog-1", topic:"Weather",
    q:"晴朗、潮湿、微风的夜里，T=16°C、Td=15°C，最值得警觉什么？",
    options:["Radiation fog","Advection fog","空气过干","Hail"],
    answer:0,
    explain:"clear night 有利于地面辐射降温；T/Td 很接近，近地面空气容易达到饱和。"
  },
  {
    id:"metar-1", topic:"METAR",
    q:"BKN008 表示什么？",
    options:["800 ft AGL broken layer","800 ft MSL broken layer","8000 ft AGL broken layer","800 ft AGL overcast"],
    answer:0,
    explain:"云层高度码乘 100 ft，METAR 云底按 AGL 报告。"
  },
  {
    id:"metar-2", topic:"METAR",
    q:"FEW005 SCT010 BKN018 的 ceiling 是？",
    options:["500 ft","1000 ft","1800 ft","没有 ceiling"],
    answer:2,
    explain:"Ceiling 看最低的 BKN / OVC / VV；FEW 和 SCT 不构成 ceiling。"
  },
  {
    id:"time-1", topic:"METAR",
    q:"181130Z 的正确含义是？",
    options:["18:11:30 UTC","18 日 11:30 UTC，无秒","18 日 11:30 当地时间","11 月 30 日 18:00"],
    answer:1,
    explain:"METAR 时间格式是 DDHHMMZ；Z = UTC / Zulu。当地时间还要结合地点、日期与 DST。"
  },
  {
    id:"alt-1", topic:"METAR",
    q:"A2988 表示的 altimeter setting 是？",
    options:["29.88 inHg","2988 hPa","29.88 ft Hg","2.988 inHg"],
    answer:0,
    explain:"美国 METAR 的 Axxxx 以 inches of mercury 报告，这里是 29.88 inHg。"
  },
  {
    id:"airspace-e-sfc", topic:"Airspace",
    q:"Sectional 上的洋红色虚线边界通常表示什么？",
    visual:classEVisual("surface"),
    options:["Class C boundary","Class E 从 surface 开始","Class E 从 700 ft AGL 开始","Class D boundary"],
    answer:1,
    explain:"洋红虚线 = Class E surface area：Class E 从地面开始。"
  },
  {
    id:"airspace-e-700", topic:"Airspace",
    q:"机场附近只有洋红色 vignette。你在 500 ft AGL，通常处于什么空域？",
    visual:classEVisual("700"),
    options:["Class A","Class B","Class E","Class G"],
    answer:3,
    explain:"洋红 vignette 表示 Class E floor 通常在 700 ft AGL；500 ft AGL 通常仍在 Class G。"
  },
  {
    id:"airspace-b-label", topic:"Airspace",
    q:"Class B sector 标注 100 / 40，正确读法是？",
    options:["ceiling 10,000 ft MSL；floor 4,000 ft MSL","ceiling 1,000 ft AGL；floor 400 ft AGL","floor 10,000 ft；ceiling 4,000 ft","从 surface 到 4,000 ft MSL"],
    answer:0,
    explain:"B/C sector altitude 的数字以百英尺表示，通常看 MSL；上面是 ceiling，下面是 floor。"
  },
  {
    id:"airspace-b-above", topic:"Airspace",
    q:"典型 Class B 顶部约 10,000 ft MSL。它上面通常立刻就是 Class A 吗？",
    options:["是，Class A 从 10,000 ft 开始","不是，通常先是 Class E，到 18,000 ft MSL 才进入 Class A","是，但只在白天","取决于能见度"],
    answer:1,
    explain:"Class A 一般从 18,000 ft MSL 开始；典型 Class B 顶部与 Class A 之间通常是 Class E。"
  },
  {
    id:"vfr-b", topic:"VFR minima",
    q:"Class B 内按 VFR 飞行，基本天气最低标准是？",
    options:["3 SM + clear of clouds","3-152","5-111","1 SM + clear of clouds"],
    answer:0,
    explain:"Class B：3 SM flight visibility + clear of clouds。进入 Class B 本身另需 ATC clearance。"
  },
  {
    id:"vfr-9500", topic:"VFR minima · trap",
    q:"Class E，9,500 ft MSL：应使用哪套基本 VFR minimums？",
    options:["3-152","5-111","clear of clouds only","Class A，不允许 VFR"],
    answer:0,
    explain:"9,500 ft MSL 仍低于 10,000；Class E 仍是 3-152。到 10,000 ft MSL 或更高才切换 5-111。"
  },
  {
    id:"vfr-five", topic:"VFR minima · trap",
    q:"5-111 里的第一个 “5” 代表什么？",
    options:["5,000 ft cloud base","5 SM flight visibility","500 ft below clouds","5 NM horizontal"],
    answer:1,
    explain:"第一个 5 = 5 statute miles flight visibility。后面的 111 = 1,000 below / 1,000 above / 1 SM horizontal。"
  },
  {
    id:"vfr-g-night", topic:"VFR minima",
    q:"固定翼飞机在 Class G、≤1,200 ft AGL、夜间，通常是否只需 clear of clouds？",
    options:["是","不是，通常需要 3 SM 与 500/1000/2000 ft cloud clearance"],
    answer:1,
    explain:"低空 Class G 的白天和夜间规则不同；夜间固定翼通常回到 3-152（§91.155 另有特定例外）。"
  },
  {
    id:"judgment-1", topic:"Judgment",
    q:"T=13°C / Td=12°C，同时 BR、4SM，首要判断更接近哪项？",
    options:["空气很干","接近饱和，visibility 可能继续恶化","一定会有雷暴","一定不能飞"],
    answer:1,
    explain:"spread 仅 1°C 且已有 mist，表示空气接近饱和；但是否能飞仍需结合完整天气与规则判断。"
  },
  {
    id:"gen-cloudbase", topic:"Weather · randomized",
    generate(){
      const spread=pick([5,7.5,10,12.5]);
      const td=pick([7,10,13,16]);
      const t=td+spread;
      const elev=pick([400,600,800,1000,1200]);
      const agl=Math.round((spread/2.5)*1000);
      const ans=agl+elev;
      const {options,answer}=shuffleOptions(ans,[agl,ans+800,Math.max(500,ans-1000)]);
      return {
        id:"gen-cloudbase-"+Date.now()+"-"+Math.random(),
        topic:"Weather · randomized",
        q:`机场 elevation ${elev} ft MSL，T=${t}°C，Td=${td}°C。按粗略公式估算 cumulus cloud base MSL？`,
        options:options.map(x=>x.toLocaleString()+" ft"),
        answer,
        explain:`T−Td=${spread}°C；spread/2.5×1000 ≈ ${agl.toLocaleString()} ft AGL；加机场 elevation 后约 ${ans.toLocaleString()} ft MSL。`
      };
    }
  },
  {
    id:"gen-gust", topic:"METAR · randomized",
    generate(){
      const steady=pick([8,10,12,14,16]);
      const factor=pick([6,8,9,11]);
      const gust=steady+factor;
      const {options,answer}=shuffleOptions(factor,[steady,gust,steady+gust]);
      return {
        id:"gen-gust-"+Date.now()+"-"+Math.random(),
        topic:"METAR · randomized",
        q:`风组 250${String(steady).padStart(2,"0")}G${String(gust).padStart(2,"0")}KT，gust factor 是？`,
        options:options.map(x=>x+" kt"),
        answer,
        explain:`gust factor = gust − sustained = ${gust} − ${steady} = ${factor} kt。`
      };
    }
  },
  {
    id:"gen-bc-label", topic:"Airspace · randomized",
    generate(){
      const ceiling=pick([80,90,100]);
      const floor=pick([20,30,40,50,60].filter(x=>x<ceiling));
      const correct=(floor*100).toLocaleString()+" ft MSL";
      const {options,answer}=shuffleOptions(correct,[
        (ceiling*100).toLocaleString()+" ft MSL",
        (floor*10).toLocaleString()+" ft AGL",
        "Surface"
      ]);
      return {
        id:"gen-bc-"+Date.now()+"-"+Math.random(),
        topic:"Airspace · randomized",
        q:`Class B/C sector 标注 ${ceiling} / ${floor}，floor 是多少？`,
        options,answer,
        explain:`上面 ${ceiling} 是 ceiling，下面 ${floor} 是 floor；数字按百英尺读，所以 floor = ${(floor*100).toLocaleString()} ft MSL。`
      };
    }
  }
];