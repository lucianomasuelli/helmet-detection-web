import { useState, useEffect } from 'react';

interface BackendConfig {
  backendUrl: string;
  status: string;
}

export const useBackendConfig = () => {
  const [config, setConfig] = useState<BackendConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [backError, setBackError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error('Error al obtener la configuración');
        }
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        setBackError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, backError };
}; 