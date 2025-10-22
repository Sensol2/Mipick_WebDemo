import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';

export function useMyTicketCount() {
  const [ticketCount, setTicketCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTicketCount() {
      try {
        setLoading(true);
        
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setTicketCount(0);
          setLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('survey_responses')
          .select('ticket_count')
          .eq('user_id', user.id)
          .single();

        if (fetchError) {
          console.error('Error fetching ticket count:', fetchError);
          setError(fetchError);
          setTicketCount(0);
        } else {
          setTicketCount(data?.ticket_count || 0);
        }
      } catch (err) {
        console.error('Unexpected error fetching ticket count:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setTicketCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchTicketCount();
  }, []);

  return { ticketCount, loading, error };
}
