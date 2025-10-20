import { useState, useEffect } from 'react';
import { getMyInviteCode } from '../../../../lib/surveyService';

export function useMyInviteCode() {
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchInviteCode() {
      try {
        setLoading(true);
        const code = await getMyInviteCode();
        setInviteCode(code);
      } catch (err) {
        console.error('Error fetching invite code:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchInviteCode();
  }, []);

  return { inviteCode, loading, error };
}
