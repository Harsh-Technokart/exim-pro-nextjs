export function getAge(birthDateString: string) {
  let age = 0;
  if (birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  }

  return age;
}
