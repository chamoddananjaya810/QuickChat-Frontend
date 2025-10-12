export function formatChatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterDay = new Date();
  yesterDay.setDate(now.getDate() - 1);


  const isYesterday=
  date.getDate()===  yesterDay.getDate() &&
  date.getMonth() ===  yesterDay.getMonth() &&
  date.getFullYear()===  yesterDay.getFullYear() ;

const timeStr=date.toLocaleTimeString([],{
    hour:"2-digit",
    minute:"2-digit",
    hour12:true,
});


if (isToday)return timeStr;
if (isYesterday) return `Yesterday ${timeStr}` //yesterdat;
return `${date.toLocaleDateString} ${timeStr}`;// today
 
}
