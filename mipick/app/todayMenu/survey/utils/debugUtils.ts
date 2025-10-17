export function debugFormData(formData: Record<string, string>) {
  console.log("=== 현재 설문 응답 데이터 ===");
  
  Object.entries(formData).forEach(([key, value]) => {
    if (value && value.trim()) {
      console.log(`${key}: ${value}`);
    }
  });
  
  console.log("\n=== JSON 형태 ===");
  console.log(JSON.stringify(formData, null, 2));
  
  const filledFields = Object.entries(formData).filter(([, value]) => value && value.trim());
  console.log(`\n총 ${filledFields.length}개 필드 입력 완료`);
}